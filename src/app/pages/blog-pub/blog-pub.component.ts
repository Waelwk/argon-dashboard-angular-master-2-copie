import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { NgForm } from '@angular/forms';
import { Blog, BlogService } from 'src/app/service/blog/ blog.service';
import { AvocatService } from 'src/app/service/Avocat/avocat.service';

@Component({
  selector: 'app-blog-pub',
  templateUrl: './blog-pub.component.html',
  styleUrls: ['./blog-pub.component.css']
})
export class BlogPubComponent {
 enAttenteCount: number = 0;
  approvedCount: number = 0;
  rejectedCount: number = 0;
  totalBlogsCount: number = 0;
isDeleteModalOpen: boolean = false;
  blogs: Blog[] = [];
  errorMessage: string = '';
  selectedImage: File | null = null;
  isEditModalOpen: boolean = false;
  selectedBlogId: number | undefined; 
  isBlogModalOpen: boolean = false; // Contrôle de l'état du modal
  selectedBlog: Blog = {
    id: null,
    title: '',
    description: '',
    image: null,
    avocatId: 1602,
    avocat: undefined
  };
  latestBlogs: Blog[] = []; // Déclaration de la variable pour les 5 derniers blogs
  avocatId: number;
  blog = {
    id: null, // Ajout de l'identifiant du blog
    title: '',
    description: '',
    image: null,
    avocatId: 1602 // Ajuster selon l'utilisateur connecté
  };
  constructor(private blogService: BlogService, private modalService: NgbModal, private toastr: ToastrService,private avocatService: AvocatService) {}

 ngOnInit(): void {
    // this.avocatId = Number(localStorage.getItem('id'));
    this.getAllBlogs();
  }

  // Ouvrir le modal d'ajout de blog
  
  // Gérer la sélection du fichier d'image
  onImageSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  // Soumettre le formulaire pour créer un blog
  
  
  // Soumettre le formulaire pour modifier un blog
  

  getAllBlogs(): void {
    this.blogService.getAll().subscribe({
      next: (data) => {
        this.blogs = data.filter(blog => blog.status === 'APPROVED');
  
        // Calcul des stats
        this.approvedCount = this.blogs.filter(blog => blog.status === 'APPROVED').length;
        this.rejectedCount = this.blogs.filter(blog => blog.status === 'REJECTED').length;
        this.enAttenteCount = this.blogs.filter(blog => blog.status === 'enAttante').length;
        this.totalBlogsCount = this.blogs.length;
        // Exemple dans le composant TypeScript
this.latestBlogs = this.blogs.slice().reverse().slice(0, 5); // pour avoir les 5 derniers

  
        // Récupération des avocats pour chaque blog
        this.blogs.forEach(blog => {
          if (blog.avocat) {
            this.avocatService.getAvocatById(blog.avocat).subscribe({
              next: (avocat) => {
                blog.avocat = avocat; // Ajoute l’objet avocat au blog
              },
              error: (err) => {
                console.error(`Erreur lors de la récupération de l'avocat ID ${blog.avocat}`, err);
              }
            });
          }
        });
  
      },
      error: (err) => {
        this.errorMessage = "Erreur lors de la récupération des blogs.";
        console.error(err);
      }
    });
  }
  
  

  openDeleteModal(blogId: number): void {
    this.selectedBlogId = blogId; // Récupérer l'ID du blog à supprimer
    this.isDeleteModalOpen = true; // Afficher le modal
  }

  // Ferme le modal de suppression
  closeDeleteModal(): void {
    this.isDeleteModalOpen = false; // Ferme le modal
  }

  // Confirmer la suppression du blog
  confirmDelete(): void {
    if (this.selectedBlogId) {
      this.blogService.delete(this.selectedBlogId).subscribe({
        next: () => {
          this.toastr.success('Blog supprimé avec succès', 'Succès');
          this.getAllBlogs(); // Rafraîchir la liste des blogs après la suppression
        },
        error: (err) => {
          this.toastr.error('Erreur lors de la suppression du blog', 'Erreur');
          console.error(err);
        }
      });
      this.closeDeleteModal(); // Ferme le modal après la suppression
    }
  }
}

