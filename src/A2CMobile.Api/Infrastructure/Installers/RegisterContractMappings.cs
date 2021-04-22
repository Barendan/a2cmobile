using A2CMobile.Api.Contracts;
using A2CMobile.Api.Data.DataManager;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace A2CMobile.Api.Infrastructure.Installers
{
    internal class RegisterContractMappings : IServiceRegistration
    {
        public void RegisterAppServices(IServiceCollection services, IConfiguration config)
        {
            //Register Interface Mappings for Repositories
            services.AddTransient<IMemberManager, MemberManager>();
        }
    }
}
