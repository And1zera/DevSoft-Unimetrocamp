using Bilhet.Repository.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace PerformaIT.PO.IoC
{
    public static class NativeInjectorBootStrapper
    {
        public static void RegisterServices(IServiceCollection services, IConfiguration config)
        {

            // App Services
            //services.AddScoped<IService, Service>();      

            // Infra - Unit Of Work
            //services.AddScoped<IUnitOfWork, UnitOfWork>();

            // Infra - Context
            services.AddScoped<DbContext, BilhetContext>();

            // Infra - Application Settings/Configurations
            services.AddSingleton<IConfiguration>(config);

        }
    }
}
