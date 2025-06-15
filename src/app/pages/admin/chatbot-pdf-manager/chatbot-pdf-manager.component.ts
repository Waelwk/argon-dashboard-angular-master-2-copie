import { Component, OnInit } from '@angular/core';
import { ChatbotService } from 'src/app/service/chatboot/chatbot.service';


@Component({
  selector: 'app-chatbot-pdf-manager',
  templateUrl: './chatbot-pdf-manager.component.html',
  styleUrls: ['./chatbot-pdf-manager.component.css']
})
export class ChatbotPdfManagerComponent implements OnInit {
  selectedFiles: File[] = [];
  pdfList: string[] = [];
  errorMessage = '';

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit(): void {
    this.loadPdfs();
  }

  onFilesSelected(event: any) {
    this.errorMessage = '';
    this.selectedFiles = Array.from(event.target.files as File[]).filter((file: File) => file.name.endsWith('.pdf'));
    if (this.selectedFiles.length === 0) {
      this.errorMessage = 'Veuillez sélectionner au moins un fichier PDF.';
    }
  }

 uploadFiles() {
  if (this.selectedFiles.length === 0) {
    this.errorMessage = 'Aucun fichier sélectionné.';
    return;
  }

  // Envoi du premier fichier uniquement
  this.chatbotService.uploadPdf([this.selectedFiles[0]]).subscribe({
    next: () => {
      this.selectedFiles = [];
      this.errorMessage = '';
      this.loadPdfs();
    },
    error: err => this.errorMessage = err.error?.detail || err.message || 'Erreur lors de l\'upload.'
  });
}

  loadPdfs() {
    this.chatbotService.listPdfs().subscribe({
      next: data => {
        this.pdfList = data;
        this.errorMessage = '';
      },
      error: err => this.errorMessage = err.error?.detail || err.message || 'Erreur lors du chargement des fichiers.'
    });
  }

  deletePdf(fileName: string) {
    this.chatbotService.deletePdf(fileName).subscribe({
      next: () => {
        this.errorMessage = '';
        this.loadPdfs();
      },
      error: err => this.errorMessage = err.error?.detail || err.message || 'Erreur lors de la suppression.'
    });
  }
}