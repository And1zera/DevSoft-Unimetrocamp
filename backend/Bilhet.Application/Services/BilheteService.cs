using Bilhet.Application.Utils;
using Bilhet.Domain.Entities;
using Bilhet.Domain.Interfaces.IRepositories;
using Bilhet.Domain.Interfaces.IServices;
using Bilhet.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Bilhet.Application.Services
{
    public class BilheteService : IBilheteService
    {
        protected readonly IUnitOfWork _unitOfWork;

        public BilheteService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Bilhete> CreateAsync(Bilhete obj)
        {
            if (obj.Id == Guid.Empty)
            {
                obj.Create(obj.UsuarioIdCriacao);

                obj.Senha = GeradorSenhas.Gerar();

                //Verifica se já existe senha
                var bilhetes = await _unitOfWork.BilheteRepository.ListAsync(x => x.Ativo);
                while (bilhetes.Any(e => e.Senha == obj.Senha))
                {
                    obj.Senha = GeradorSenhas.Gerar();
                }

                var ret = _unitOfWork.BilheteRepository.Add(obj);

                return (_unitOfWork.Commit() ? ret : null);
            }

            return null;
        }

        public async Task<Bilhete> GetByIdAsync(Guid id)
        {
            return await _unitOfWork.BilheteRepository.GetByIdAsync(id);
        }

        public async Task<Bilhete> GetBySpecAsync(Expression<Func<Bilhete, bool>> spec)
        {
            return await _unitOfWork.BilheteRepository.GetByExpressionAsync(spec);
        }

        public async Task<bool> Inactivate(Guid id, Guid usuarioIdAlteracao)
        {
            var d = await _unitOfWork.BilheteRepository.GetByIdAsync(id);

            if (d == null)
                return false;

            d.Update(usuarioIdAlteracao);

            d.Ativo = !d.Ativo;

            _unitOfWork.BilheteRepository.Update(d);

            return _unitOfWork.Commit();
        }

        public async Task<bool> InactivateBySenha(string senha, Guid usuarioIdAlteracao)
        {
            var d = await _unitOfWork.BilheteRepository.GetByExpressionAsync(x => x.Senha.Equals(senha));

            if (d == null)
                return false;

            d.Update(usuarioIdAlteracao);

            d.Ativo = !d.Ativo;

            _unitOfWork.BilheteRepository.Update(d);

            return _unitOfWork.Commit();
        }

        public async Task<IEnumerable<Bilhete>> ListAllAsync()
        {
            return await _unitOfWork.BilheteRepository.ListAllTrackingAsync();
        }

        public async Task<IEnumerable<Bilhete>> ListAsync(Expression<Func<Bilhete, bool>> spec)
        {
            return await _unitOfWork.BilheteRepository.ListAsync(spec);
        }

        public async Task<bool> UpdateAsync(Bilhete obj)
        {
            var d = await _unitOfWork.BilheteRepository.GetByIdAsync(obj.Id);

            if (d == null)
                return false;

            d.Update(obj.UsuarioIdAlteracao.Value);

            d.RG = obj.RG;
            d.Preco = obj.Preco;
            d.Senha = obj.Senha;

            _unitOfWork.BilheteRepository.Update(d);

            return _unitOfWork.Commit();
        }

        public async Task<bool> TrocarAsync(Bilhete obj)
        {
            var d = await _unitOfWork.BilheteRepository.GetByIdAsync(obj.Id);

            if (d == null)
                return false;

            if (d.Senha != obj.Senha)
                throw new Exception("A senha enviada não corresponde ao ingresso");

            d.Update(obj.UsuarioIdAlteracao.Value);

            d.RG = obj.RG;

            _unitOfWork.BilheteRepository.Update(d);

            return _unitOfWork.Commit();
        }

        public Bilhete Create(Bilhete obj)
        {
            throw new NotImplementedException();
        }
    }
}
