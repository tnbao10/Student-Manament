using WebAPI.Dtos;
using WebAPI.Models;

namespace WebAPI.Services;

public interface CourseService
{
    public CourseDto findById(int id);

    public List<CourseDto> findByStuId(int id);


    public List<CourseDto> findAllDTO();

    public List<CourseDto> findByKeywordDTO(string keyword);

    public List<CourseDto> findByKeywordDTO1(string keyword, int stuId);

    public List<CourseDto> findByScore(double Score, int stuId);


    public bool createDTO(CourseDto courseDto);

    public bool delete(int id);

    public bool updateDTO(CourseDto courseDto);


}
