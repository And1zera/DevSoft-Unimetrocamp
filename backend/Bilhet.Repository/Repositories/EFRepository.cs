using Bilhet.Domain;
using Microsoft.EntityFrameworkCore;
using PerformaIT.GCAR.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Bilhet.Repository.Repositories
{

    public class EfRepository<T> : IDisposable, IBaseRepository<T> where T : BaseEntity
    {

        protected readonly DbContext _dbContext;

        public EfRepository(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public T GetById(Guid id)
        {
            return _dbContext.Set<T>().FirstOrDefault(c => c.Id == id);
        }

        public async Task<T> GetByIdAsync(Guid id)
        {
            return await _dbContext.Set<T>().FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<T> GetByExpressionAsync(Expression<Func<T, bool>> spec)
        {
            return await _dbContext.Set<T>().FirstOrDefaultAsync(spec);
        }

        public IEnumerable<T> ListAll()
        {
            return _dbContext.Set<T>().AsNoTracking().AsEnumerable();
        }

        public async Task<List<T>> ListAllAsync()
        {
            return await _dbContext.Set<T>().AsNoTracking().ToListAsync();
        }

        public IEnumerable<T> ListAllTracking()
        {
            return _dbContext.Set<T>().AsEnumerable();
        }

        public async Task<List<T>> ListAllTrackingAsync()
        {
            return await _dbContext.Set<T>().ToListAsync();
        }

        public IEnumerable<T> List(Expression<Func<T, bool>> spec)
        {
            return _dbContext.Set<T>().Where(spec).AsNoTracking().AsEnumerable();
        }

        public async Task<List<T>> ListAsync(Expression<Func<T, bool>> spec)
        {
            return await _dbContext.Set<T>().Where(spec).AsNoTracking().ToListAsync();
        }

        public IEnumerable<T> ListTracking(Expression<Func<T, bool>> spec)
        {
            return _dbContext.Set<T>().Where(spec).AsEnumerable();
        }

        public async Task<List<T>> ListTrackingAsync(Expression<Func<T, bool>> spec)
        {
            return await _dbContext.Set<T>().Where(spec).ToListAsync();
        }

        public T Add(T entity)
        {
            _dbContext.Set<T>().Add(entity);

            return entity;
        }

        public void Update(T entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
        }

        public void ActiveInactive(T entity)
        {
            entity.Ativo = !entity.Ativo;

            _dbContext.Entry(entity).State = EntityState.Modified;
        }

        public void Delete(T entity)
        {
            _dbContext.Set<T>().Remove(entity);
        }

        public void Dispose()
        {
            _dbContext?.Dispose();
            GC.SuppressFinalize(this);
        }

    }
}
