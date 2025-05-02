import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Blog {
  id?: number;
  title: string;
  description: string;
  avocatId: number;
  image?: File | Blob;
  name?: string;
  type?: string;
  createdBy?: any;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private apiUrl = 'http://localhost:8080/api/blog';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }

  getById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }

  create(blog: Blog): Observable<Blog> {
    const formData = new FormData();
    formData.append('title', blog.title);
    formData.append('description', blog.description);
    formData.append('avocatId', blog.avocatId.toString());
    if (blog.image) {
      formData.append('image', blog.image);
    }

    return this.http.post<Blog>(this.apiUrl, formData);
  }

  update(id: number, blog: Blog): Observable<Blog> {
    const formData = new FormData();
    formData.append('title', blog.title);
    formData.append('description', blog.description);
    formData.append('avocatId', blog.avocatId.toString());
    if (blog.image) {
      formData.append('image', blog.image);
    }

    return this.http.put<Blog>(`${this.apiUrl}/${id}`, formData);
  }

  approve(id: number): Observable<Blog> {
    return this.http.patch<Blog>(`${this.apiUrl}/${id}/approve`, {});
  }

  reject(id: number): Observable<Blog> {
    return this.http.patch<Blog>(`${this.apiUrl}/${id}/reject`, {});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getImage(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/image`, { responseType: 'blob' });
  }
}
