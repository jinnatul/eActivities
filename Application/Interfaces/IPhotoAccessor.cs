using Microsoft.AspNetCore.Http;
using Application.Photos;

namespace Application.Interfaces
{
    public interface IPhotoAccessor
    {
         PhotoUploadResult AddPhoto(IFormFile file);

         string DeletePhoto(string publicId);
    }
}