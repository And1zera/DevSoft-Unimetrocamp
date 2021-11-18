using Bilhet.Domain.Entities;
using Bilhet.Domain.Interfaces.IRepositories;
using Bilhet.Domain.Interfaces.IServices;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Bilhet.Application.Services
{
    public class UsuarioService : IUsuarioService
    {
        protected readonly IUnitOfWork _unitOfWork;

        public UsuarioService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public Usuario Create(Usuario obj)
        {
            if (obj.Id == Guid.Empty)
            {
                obj.Create(obj.UsuarioIdCriacao);

                var ret = _unitOfWork.UsuarioRepository.Add(obj);

                return (_unitOfWork.Commit() ? ret : null);
            }

            return null;
        }

        public async Task<Usuario> GetByIdAsync(Guid id)
        {
            return await _unitOfWork.UsuarioRepository.GetByIdAsync(id);
        }

        public async Task<Usuario> GetBySpecAsync(Expression<Func<Usuario, bool>> spec)
        {
            return await _unitOfWork.UsuarioRepository.GetByExpressionAsync(spec);
        }

        public async Task<bool> Inactivate(Guid id, Guid usuarioIdAlteracao)
        {
            var d = await _unitOfWork.UsuarioRepository.GetByIdAsync(id);

            if (d == null)
                return false;

            d.Update(usuarioIdAlteracao);

            d.Ativo = !d.Ativo;

            _unitOfWork.UsuarioRepository.Update(d);

            return _unitOfWork.Commit();
        }

        public async Task<IEnumerable<Usuario>> ListAllAsync()
        {
            return await _unitOfWork.UsuarioRepository.ListAllAsync();
        }

        public async Task<IEnumerable<Usuario>> ListAsync(Expression<Func<Usuario, bool>> spec)
        {
            return await _unitOfWork.UsuarioRepository.ListTrackingAsync(spec);
        }

        public async Task<bool> UpdateAsync(Usuario obj)
        {
            var d = await _unitOfWork.UsuarioRepository.GetByIdAsync(obj.Id);

            if (d == null)
                return false;

            d.Update(obj.UsuarioIdAlteracao.Value);

            d.Nome = obj.Nome;
            d.CPF = obj.CPF;
            d.Login = obj.Login;
            d.Email = obj.Email;
            d.Senha = obj.Senha;
            d.Fidelidade = obj.Fidelidade;

            _unitOfWork.UsuarioRepository.Update(d);

            return _unitOfWork.Commit();
        }
    }
}
