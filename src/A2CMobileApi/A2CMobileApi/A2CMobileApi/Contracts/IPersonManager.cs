using System.Collections.Generic;
using System.Threading.Tasks;
using A2CMobileApi.Data;
using A2CMobileApi.Data.Entity;

namespace A2CMobileApi.Contracts
{
    public interface IPersonManager : IRepository<Person>
    {
        Task<(IEnumerable<Person> Persons, Pagination Pagination)> GetPersonsAsync(UrlQueryParameters urlQueryParameters);

        //Add more class specific methods here when neccessary
    }
}
