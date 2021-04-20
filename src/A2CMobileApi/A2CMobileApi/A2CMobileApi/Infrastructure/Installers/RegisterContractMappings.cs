using A2CMobileApi.Contracts;
using A2CMobileApi.Data.DataManager;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace A2CMobileApi.Infrastructure.Installers
{
    internal class RegisterContractMappings : IServiceRegistration
    {
        public void RegisterAppServices(IServiceCollection services, IConfiguration config)
        {
            //Register Interface Mappings for Repositories
            services.AddTransient<IPersonManager, PersonManager>();
        }
    }
}
