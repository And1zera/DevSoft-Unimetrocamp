using Bilhet.Domain.Entities;
using Bilhet.Domain.Interfaces.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Bilhet.Repository.Repositories
{
    public class UsuarioRepository : EfRepository<Usuario>, IUsuarioRepository
    {
        public UsuarioRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
