using System;

namespace Application.Comments
{
    public class CommentDto
    {
        public Guid Id { get; set; }
        
        public string Body { get; set; }
        
        public DateTime CreateAt { get; set; }

        public string UserName { get; set; }

        public string DisplayName { get; set; }

        public string Image { get; set; }
    }
}