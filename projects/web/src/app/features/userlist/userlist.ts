import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table } from '../../shared/components/table/table';
import { Filter } from '../../shared/components/filter/filter';
import { UserService } from '../../core/services/user/user';
import { UserInterface } from '../../shared/models/user.model';
import { Pagination } from '../../shared/components/pagination/pagination';

@Component({
  selector: 'da-userlist',
  standalone: true,
  imports: [CommonModule, Table, Filter, Pagination],
  templateUrl: './userlist.html',
  styleUrl: './userlist.scss',
})
export class Userlist implements OnInit {
  private userService = inject(UserService);

  // Lista original completa
  users = signal<UserInterface[]>([]);

  // Lista filtrada para exibir na tabela
  filteredUsers = signal<UserInterface[]>([]);
  currentPage = signal(1);
  itemsPerPage = signal(5);

  columns = signal<{ key: keyof UserInterface; label: string }[]>([
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'E-mail' },
    { key: 'avatar', label: 'Avatar' },
  ]);

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.userService.getUser().subscribe({
      next: (users: UserInterface[]) => {
        this.users.set(users); // lista completa
        this.filteredUsers.set(users); // inicialmente, exibimos tudo
      },
      error: (err) => {
        console.error('❌ Erro ao buscar usuários:', err);
      },
    });
  }

  onFilteredData(filtered: UserInterface[]) {
    this.filteredUsers.set(filtered);
  }
  readonly paginatedUsers = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    const end = start + this.itemsPerPage();
    return this.filteredUsers().slice(start, end);
  });

  onPageChange(page: number) {
    this.currentPage.set(page);
  }
}
