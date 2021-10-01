using Bilhet.Domain.Entities;
using Bilhet.Domain.Interfaces.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Bilhet.Repository.Repositories
{
    public class BilheteRepository : EfRepository<Bilhete>, IBilheteRepository
    {
        public BilheteRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
