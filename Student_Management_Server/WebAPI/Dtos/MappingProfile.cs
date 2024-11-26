using AutoMapper;
using System.Globalization;
using WebAPI.Models;

namespace WebAPI.Dtos;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Course, CourseDto>().ReverseMap();

        //CreateMap<Student, StudentDto>().ReverseMap();


        CreateMap<Student, StudentDto>().ForMember(
                des => des.StuDob,
                src => src.MapFrom(src => src.StuDob.ToString("dd/MM/yyyy"))
            );
        CreateMap<StudentDto, Student>().ForMember(
                des => des.StuDob,
                src => src.MapFrom(s => DateTime.ParseExact(s.StuDob, "dd/MM/yyyy", CultureInfo.InvariantCulture))
            );
    }
}

