using System;

namespace Bilhet.API
{
    public abstract class BaseDTO
    {

        public Guid Id { get; set; }
        public DateTime DataHoraCriacao { get; set; }
        public DateTime? DataHoraAlteracao { get; set; }
        public Guid UsuarioIdCriacao { get; set; }
        public Guid? UsuarioIdAlteracao { get; set; }
        public bool Ativo { get; set; }

    }
}
