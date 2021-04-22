using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using A2CMobile.Api.Contracts;
using A2CMobile.Api.Data.Entity;
using Dapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace A2CMobile.Api.Data.DataManager
{
    public class MemberManager : DbFactoryBase, IMemberManager
    {
        private readonly ILogger<MemberManager> _logger;
        public MemberManager(IConfiguration config, ILogger<MemberManager> logger) : base(config)
        {
            _logger = logger;
        }

        public async Task<(IEnumerable<Member> Members, Pagination Pagination)> GetMembersAsync(UrlQueryParameters urlQueryParameters)
        {
            IEnumerable<Member> members;
            int recordCount = default;

            //For SqlServer
            var query = @"SELECT Id, FirstName, LastName, Dob FROM Member
                            ORDER BY Id DESC
                            OFFSET @Limit * (@Offset -1) ROWS
                            FETCH NEXT @Limit ROWS ONLY";

            var param = new DynamicParameters();
            param.Add("Limit", urlQueryParameters.PageSize);
            param.Add("Offset", urlQueryParameters.PageNumber);

            if (urlQueryParameters.IncludeCount)
            {
                query += " SELECT COUNT(Id) FROM Member";
                var pagedRows = await DbQueryMultipleAsync<Member, int>(query, param);

                members = pagedRows.Data;
                recordCount = pagedRows.RecordCount;
            }
            else
            {
                members = await DbQueryAsync<Member>(query, param);
            }

            var metadata = new Pagination
            {
                PageNumber = urlQueryParameters.PageNumber,
                PageSize = urlQueryParameters.PageSize,
                TotalRecords = recordCount
            };

            return (members, metadata);
        }
        public async Task<IEnumerable<Member>> GetAllAsync()
        {
            return await DbQueryAsync<Member>("SELECT * FROM Member");
        }

        public async Task<Member> GetByIdAsync(object id)
        {
            return await DbQuerySingleAsync<Member>("SELECT * FROM Member WHERE Id = @Id", new { id });
        }

        public async Task<long> CreateAsync(Member member)
        {
            string sqlQuery = $@"INSERT INTO Member (FirstName, LastName, Dob)
                                 VALUES (@FirstName, @LastName, @Dob)
                                 SELECT CAST(SCOPE_IDENTITY() as bigint)";

            return await DbQuerySingleAsync<long>(sqlQuery, member);
        }
        public async Task<bool> UpdateAsync(Member member)
        {
            string sqlQuery = $@"IF EXISTS (SELECT 1 FROM Member WHERE Id = @Id)
                                            UPDATE Member SET FirstName = @FirstName, LastName = @LastName, Dob = @Dob
                                            WHERE Id = @Id";

            return await DbExecuteAsync<bool>(sqlQuery, member);
        }
        public async Task<bool> DeleteAsync(object id)
        {
            string sqlQuery = $@"IF EXISTS (SELECT 1 FROM Member WHERE Id = @Id)
                                            DELETE Member WHERE Id = @Id";

            return await DbExecuteAsync<bool>(sqlQuery, new { id });
        }
        public async Task<bool> ExistAsync(object id)
        {
            return await DbExecuteScalarAsync("SELECT COUNT(1) FROM Member WHERE Id = @Id", new { id });
        }

        public async Task<bool> ExecuteWithTransactionScope()
        {
            using (var dbCon = new SqlConnection(DbConnectionString))
            {
                await dbCon.OpenAsync();
                var transaction = await dbCon.BeginTransactionAsync();

                try
                {
                    //Do stuff here Insert, Update or Delete
                    Task q1 = dbCon.ExecuteAsync("<Your SQL Query here>");
                    Task q2 = dbCon.ExecuteAsync("<Your SQL Query here>");
                    Task q3 = dbCon.ExecuteAsync("<Your SQL Query here>");

                    await Task.WhenAll(q1, q2, q3);

                    //Commit the Transaction when all query are executed successfully

                    await transaction.CommitAsync();
                }
                catch (Exception ex)
                {
                    //Rollback the Transaction when any query fails
                    transaction.Rollback();
                    _logger.Log(LogLevel.Error, ex, "Error when trying to execute database operations within a scope.");

                    return false;
                }
            }
            return true;
        }
    }
}
