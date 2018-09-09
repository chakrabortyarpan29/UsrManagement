import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Group} from "../model/group";

@Component({
    selector: 'courses-card-list',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

    @Input()
    group: Group[];

    constructor() {
    }

    ngOnInit() {
    }

}
