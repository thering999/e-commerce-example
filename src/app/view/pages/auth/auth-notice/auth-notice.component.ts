// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, Output } from '@angular/core';
// RxJS
import { Subscription } from 'rxjs';
// Auth
import { AuthNoticeService } from '../../../../core/auth/auth-notice/auth-notice.service';
import { AuthNotice } from '../../../../core/auth/auth-notice/auth-notice.interface'

@Component({
	selector: 'app-auth-notice',
	templateUrl: './auth-notice.component.html',
})
export class AuthNoticeComponent implements OnInit, OnDestroy {

  //public properties
	@Output() type: any;
  @Output() message: any = '';

  hide= true;

  closeNotice :boolean=true;


	// Private properties
	private subscriptions: Subscription[] = [];


  constructor(
    public authNoticeService: AuthNoticeService,
    private cdr: ChangeDetectorRef
    ) {
	}

	ngOnInit() {
		this.subscriptions.push(this.authNoticeService.onNoticeChanged$.subscribe(
			(notice: AuthNotice) => {
				notice = Object.assign({}, {message: '', type: ''}, notice);
				this.message = notice.message;
				this.type = notice.type;
				this.cdr.markForCheck();
			}
		));
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  hideNotice() {
    this.closeNotice= false;

  }
}
