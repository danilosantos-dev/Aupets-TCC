using AutoMapper;
using Entities.DataTransferObjects;
using Entities.Models;

namespace AupetsServer
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Usuario, UsuarioDto>();
        }        
    }
}