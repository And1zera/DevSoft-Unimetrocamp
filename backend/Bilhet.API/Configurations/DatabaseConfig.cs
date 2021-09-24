using System;
using Bilhet.Repository.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Bilhet.API.Configurations
{
    public static class DatabaseConfig
    {
        public static void AddDatabaseConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            if (services == null) throw new ArgumentNullException(nameof(services));
            services.AddDbContext<BilhetContext>(options => options.UseLazyLoadingProxies().UseSqlServer(configuration.GetConnectionString("SQL")));
        }
    }
}
