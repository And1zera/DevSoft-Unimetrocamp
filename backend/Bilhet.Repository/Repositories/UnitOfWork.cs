﻿using Bilhet.Domain.Interfaces.IRepositories;
using Bilhet.Repository.Context;
using Microsoft.EntityFrameworkCore;
using System;

namespace Bilhet.Repository.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DbContext _context;

        public IEventoRepository EventoRepository { get; }

        public UnitOfWork(BilhetContext context)
        {
            this._context = context;

            this.EventoRepository = new EventoRepository(_context);
 
        }

        public bool Commit()
        {
            return _context.SaveChanges() > 0;
        }

        public void Dispose()
        {
            _context?.Dispose();
            GC.SuppressFinalize(this);
        }

    }
}