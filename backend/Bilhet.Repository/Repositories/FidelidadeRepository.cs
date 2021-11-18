using Bilhet.Domain.Entities;
using Bilhet.Domain.Interfaces.IRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Bilhet.Repository.Repositories
{
    public class FidelidadeRepository : IFidelidadeRepository
    {
        private readonly DbContext _dbContext;
        public FidelidadeRepository(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Fidelidade Add(Fidelidade entity)
        {
            _dbContext.Set<Fidelidade>().Add(entity);

            return entity;
        }

        public async Task<List<Fidelidade>> ListAsync(Expression<Func<Fidelidade, bool>> spec)
        {
            return await _dbContext.Set<Fidelidade>().Where(spec).AsNoTracking().ToListAsync();
        }

        public void Delete(Fidelidade entity)
        {
            _dbContext.Set<Fidelidade>().Remove(entity);
        }
    }
}
