using AutoMapper;
using Bilhet.API.Views.DTOs;
using Bilhet.Domain.Entities;

namespace Bilhet.API.Configurations
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {

            CreateMap<EventoDTO, Evento>().ReverseMap();

            CreateMap<BilheteDTO, Bilhete>().ReverseMap();

            CreateMap<UsuarioDTO, Usuario>().ReverseMap()
                .ForMember(c => c.Fidelidades, opt => opt.Ignore());

            CreateMap<FidelidadeDTO, Fidelidade>().ReverseMap()
                .ForMember(c => c.Bilhete, opt => opt.Ignore())
                .ForMember(c => c.Usuario, opt => opt.Ignore());

        }
    }
}