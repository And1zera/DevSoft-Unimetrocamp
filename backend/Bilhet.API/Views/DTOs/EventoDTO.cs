using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Bilhet.API.Views.DTOs
{
    public class EventoDTO : BaseDTO
    {
        public string Titulo { get; set; }
        public decimal Preco { get; set; }
        public int QtdIngresso { get; set; }
        public string URLImage { get; set; }
        public DateTime Data { get; set; }
        public string Endereco { get; set; }

        [JsonIgnore]
        public virtual ICollection<BilheteDTO> Bilhetes { get; set; } = new List<BilheteDTO>();
    }
}