using Bilhet.Application.Services;
using Bilhet.Domain.Interfaces.IRepositories;
using Bilhet.Domain.Interfaces.IServices;
using Bilhet.Repository.Context;
using Bilhet.Repository.Repositories;
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
            services.AddScoped<IEventoService, EventoService>();      
            services.AddScoped<IBilheteService, BilheteService>();
            services.AddScoped<IUsuarioService, UsuarioService>();
            services.AddScoped<IFidelidadeService, FidelidadeService>();

            // Infra - Unit Of Work
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            // Infra - Context
            services.AddScoped<DbContext, BilhetContext>();

            // Infra - Application Settings/Configurations
            services.AddSingleton<IConfiguration>(config);

        }
    }
}
