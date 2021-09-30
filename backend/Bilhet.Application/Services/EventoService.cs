using Bilhet.Application.Utils;
using Bilhet.Domain.Entities;
using Bilhet.Domain.Interfaces.IRepositories;
using Bilhet.Domain.Interfaces.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Bilhet.Application.Services
{
    public class EventoService : IEventoService
    {
        protected readonly IUnitOfWork _unitOfWork;

        public EventoService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public Evento Create(Evento obj)
        {
            if (obj.Id == Guid.Empty)
            {
                obj.Create(obj.UsuarioIdCriacao);

                var ret = _unitOfWork.EventoRepository.Add(obj);

                return (_unitOfWork.Commit() ? ret : null);
            }

            return null;
        }

        public async Task<Evento> GetByIdAsync(Guid id)
        {
            return await _unitOfWork.EventoRepository.GetByIdAsync(id);
        }

        public async Task<Evento> GetBySpecAsync(Expression<Func<Evento, bool>> spec)
        {
            return await _unitOfWork.EventoRepository.GetByExpressionAsync(spec);
        }

        public async Task<bool> Inactivate(Guid id, Guid usuarioIdAlteracao)
        {
            var d = await _unitOfWork.EventoRepository.GetByIdAsync(id);

            if (d == null)
                return false;

            d.Update(usuarioIdAlteracao);

            d.Ativo = !d.Ativo;

            _unitOfWork.EventoRepository.Update(d);

            return _unitOfWork.Commit();
        }

        public async Task<IEnumerable<Evento>> ListAllAsync()
        {
            return await _unitOfWork.EventoRepository.ListAllAsync();
        }

        public async Task<IEnumerable<Evento>> ListAsync(Expression<Func<Evento, bool>> spec)
        {
            return await _unitOfWork.EventoRepository.ListAsync(spec);
        }

        public async Task<bool> UpdateAsync(Evento obj)
        {
            var d = await _unitOfWork.EventoRepository.GetByIdAsync(obj.Id);

            if (d == null)
                return false;

            d.Update(obj.UsuarioIdAlteracao.Value);

            d.Titulo = obj.Titulo;
            d.Preco = obj.Preco;
            d.QtdIngresso = obj.QtdIngresso;
            d.URLImage = obj.URLImage;
            d.Data = obj.Data;
            d.Endereco = obj.Endereco;

            _unitOfWork.EventoRepository.Update(d);

            return _unitOfWork.Commit();
        }
    }
}
