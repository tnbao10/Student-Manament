using WebAPI.Dtos;
using WebAPI.Models;

namespace WebAPI.Services;

public interface StudentService
{
    public StudentDto findById(int id);

    public List<StudentDto> findAllDTO();

    public List<StudentDto> findByKeywordDTO(string keyword);

    public bool createDTO(StudentDto studentDto);

    public bool delete(int id);


    public bool updateDTO(StudentDto studentDto);


}
