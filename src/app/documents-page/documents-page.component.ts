import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../services/documents.service';

interface DocumentsItem {
  id: string;
  category: string;
  Title: string;
  contentText: string;
  contentFile: {
    url: string;
  };
}

@Component({
  selector: 'app-documents-page',
  templateUrl: './documents-page.component.html',
  styleUrls: ['./documents-page.component.scss'],
  preserveWhitespaces: true,
})
export class DocumentsPageComponent implements OnInit {
  documentsItemList: DocumentsItem[];

  constructor(private documentsService: DocumentsService) {}

  ngOnInit() {
    this.getDocuments();
  }

  getDocuments(): void {
    this.documentsService
      .fetchDocumentsList()
      .subscribe(
        (documentsItemList) => (this.documentsItemList = documentsItemList)
      );
  }
}
