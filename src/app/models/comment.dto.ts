export interface CommentDTO {
  user: string;        // Usuario que hizo el comentario
  content: string;     // Texto del comentario
  requestId: number;   // ID de la solicitud asociada
  authorEmail: string; // Email del autor del comentario
  propertyId: number;  // ID de la propiedad
  rating: number;      // Calificación del comentario
}