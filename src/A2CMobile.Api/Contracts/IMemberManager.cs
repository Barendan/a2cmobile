using System.Collections.Generic;
using System.Threading.Tasks;
using A2CMobile.Api.Data;
using A2CMobile.Api.Data.Entity;

namespace A2CMobile.Api.Contracts
{
    public interface IMemberManager : IRepository<Member>
    {
        Task<(IEnumerable<Member> Members, Pagination Pagination)> GetMembersAsync(UrlQueryParameters urlQueryParameters);

        //Add more class specific methods here when neccessary
    }
}
