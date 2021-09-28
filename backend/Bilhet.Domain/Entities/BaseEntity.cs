using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bilhet.Domain
{
    public abstract class BaseEntity
    {
        public Guid Id { get; set; }
        public DateTime DataHoraCriacao { get; set; }
        public DateTime? DataHoraAlteracao { get; set; }
        public Guid UsuarioIdCriacao { get; set; }
        public Guid? UsuarioIdAlteracao { get; set; }
        public bool Ativo { get; set; }

        public void Create(Guid userId)
        {
            this.Id = Guid.NewGuid();
            this.UsuarioIdCriacao = userId;
            this.DataHoraCriacao = DateTime.UtcNow;
            this.Ativo = true;
        }

        public void Update(Guid userId)
        {
            this.UsuarioIdAlteracao = userId;
            this.DataHoraAlteracao = DateTime.UtcNow;
        }
    }
}
