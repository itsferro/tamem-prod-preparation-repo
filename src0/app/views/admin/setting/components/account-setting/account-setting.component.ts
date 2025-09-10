import { Component, inject, type TemplateRef } from '@angular/core'
import { ActiveLogs } from '../../data'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'account-setting',
  standalone: true,
  imports: [],
  templateUrl: './account-setting.component.html',
  styles: ``,
})
export class AccountSettingComponent {
  logList = ActiveLogs

  public modalservice = inject(NgbModal)

  openModal(content: TemplateRef<any>) {
    this.modalservice.open(content)
  }
}
