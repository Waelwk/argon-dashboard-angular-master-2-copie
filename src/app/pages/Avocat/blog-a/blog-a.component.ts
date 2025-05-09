import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { NgForm } from '@angular/forms';
import { Blog, BlogService } from 'src/app/service/blog/ blog.service';

@Component({
  selector: 'app-blog-a',
  templateUrl: './blog-a.component.html',
  styleUrls: ['./blog-a.component.css']
})
export class BlogAComponent {
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
  avocatId: number;
  blog = {
    id: null, // Ajout de l'identifiant du blog
    title: '',
    description: '',
    image: null,
    avocatId: 1602 // Ajuster selon l'utilisateur connecté
  };
  constructor(private blogService: BlogService, private modalService: NgbModal, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.avocatId = Number(localStorage.getItem('id'));
    console.log(this.avocatId);
    this.getAllBlogs();
  }

  // Ouvrir le modal d'ajout de blog
  openAddBlogModal() {
    this.selectedBlog = { id: null, title: '', description: '', image: null, avocatId: this.avocatId, avocat: undefined }; // Réinitialiser le formulaire
    this.isBlogModalOpen = true; // Ouvrir le modal

  }

  // Ouvrir le modal de modification de blog
  openEditModal(blog: Blog): void {
    this.selectedBlog = { ...blog };
    this.selectedImage = null; // Réinitialiser l'image sélectionnée
    this.isEditModalOpen = true;
  }

  // Fermer le modal
  closeBlogModal(): void {
    this.isEditModalOpen =false ;
    this.isBlogModalOpen = false; // Fermer le modal
    this.selectedBlog = { id: null, title: '', description: '', image: null, avocatId: this.avocatId, avocat: undefined }; // Réinitialiser le blog sélectionné
  }

  // Gérer la sélection du fichier d'image
  onImageSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  // Soumettre le formulaire pour créer un blog
  onSubmit(form: NgForm): void {
    if (form.invalid || !this.selectedBlog.title || !this.selectedBlog.description || !this.selectedImage) {
      this.toastr.error("Veuillez remplir tous les champs requis et ajouter une image.", "Erreur");
      return;
    }

    // Préparer l'objet blog
    const newBlog: Blog = {
      ...this.selectedBlog,
      image: this.selectedImage || undefined
    };

    this.blogService.create(newBlog).subscribe({
      next: () => {
        this.toastr.success("Blog ajouté avec succès", "Succès");
        this.closeBlogModal();
        this.getAllBlogs();
      },
      error: (err) => {
        this.toastr.error("Erreur lors de l'ajout du blog", "Erreur");
        console.error(err);
      }
    });
  }

  // Soumettre le formulaire pour modifier un blog
  onUpdateBlog(form: NgForm): void {

    if (form.invalid || !this.selectedBlog.id) {
      this.toastr.error("Formulaire invalide ou blog non sélectionné.", "Erreur");
      return;
    }

    // Préparer l'objet blog mis à jour
    const updatedBlog: Blog = {
      ...this.selectedBlog,
      image: this.selectedImage || undefined
    };
console.log(updatedBlog);
    this.blogService.update(this.selectedBlog.id, updatedBlog).subscribe({
      next: () => {
        this.toastr.success("Blog mis à jour avec succès", "Succès");
        this.getAllBlogs();
        this.closeBlogModal();
      },
      error: (err) => {
        this.toastr.error("Erreur lors de la mise à jour du blog.", "Erreur");
        console.error(err);
      }
    });
  }toggleDescription(blog: any, event: Event): void {
    event.preventDefault(); // Empêche le comportement par défaut du lien
    blog.showFull = !blog.showFull; // Bascule l'état de 'showFull' du blog
  }
  


  getAllBlogs(): void {
    this.blogService.getAll().subscribe({
      next: (data) => {

        this.blogs = data.filter(blog => 
          blog.avocat === this.avocatId || 
          (blog.avocat && blog.avocat.id === this.avocatId)
        );
        
      
        this.approvedCount = this.blogs.filter(blog => blog.status === 'APPROVED').length;
        this.rejectedCount = this.blogs.filter(blog => blog.status === 'REJECTED').length
        this.enAttenteCount = this.blogs.filter(blog => blog.status === 'enAttante').length;
        console.log('Blogs en attente:', this.enAttenteCount);  
        this.totalBlogsCount = this.blogs.length;
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

