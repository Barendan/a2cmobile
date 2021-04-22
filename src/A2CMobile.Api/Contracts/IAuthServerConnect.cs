using System.Threading.Tasks;

namespace A2CMobile.Api.Contracts
{
    public interface IAuthServerConnect
    {
        Task<string> RequestClientCredentialsTokenAsync();
    }
}
