using Bilhet.Domain.Entities;
using Bilhet.Domain.Interfaces.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Bilhet.Repository.Repositories
{
    public class EventoRepository : EfRepository<Evento>, IEventoRepository
    {
        public EventoRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
