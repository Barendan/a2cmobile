using System.Threading.Tasks;

namespace A2CMobileApi.Contracts
{
    public interface IAuthServerConnect
    {
        Task<string> RequestClientCredentialsTokenAsync();
    }
}
