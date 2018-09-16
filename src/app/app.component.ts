import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  ctx = null;
  branchWidth = 10;
  lAngle = 15;
  rAngle = 15;
  length = 120;
  lengthModificator = 0.8;
  leafsEnabled = true;

  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  constructor() { }

  ngOnInit() {
    const cvs = this.canvas.nativeElement;
    this.ctx = cvs.getContext('2d');
    this.ctx.clearRect(0, 0, cvs.width, cvs.height);
    this.ctx.strokeStyle = 'darkgreen';
    this.ctx.fillStyle = 'green';

    this.draw(500, 600, this.length, 0, this.branchWidth);
  }

  draw(startX, startY, len, angle, branchWidth) {
    this.ctx.beginPath();
    this.ctx.save();
    this.ctx.lineWidth = branchWidth;
    this.ctx.shadowBlur = 15;
    this.ctx.shadowColor = 'black';

    this.ctx.translate(startX, startY);
    this.ctx.rotate(angle * Math.PI / 180);
    this.ctx.moveTo(0, 0);
    if (angle > 0) {
      this.ctx.bezierCurveTo(10, -len / 2, 10, -len / 2, 0, -len);
    } else {
      this.ctx.bezierCurveTo(-10, -len / 2, -10, -len / 2, 0, -len);
    }
    this.ctx.stroke();

    if (len < 5 && this.leafsEnabled) {
      this.ctx.beginPath();
      this.ctx.arc(0, -len, 10, 0, Math.PI / 2);
      this.ctx.fill();
      this.ctx.restore();
      return;
    }

    if (len < 10 && !this.leafsEnabled) {
      this.ctx.restore();
      return;
    }

    this.draw(0, -len, len * this.lengthModificator, angle + this.rAngle, branchWidth * 0.8);
    this.draw(0, -len, len * this.lengthModificator, angle - this.lAngle, branchWidth * 0.8);
    this.ctx.restore();
  }

  onMenuChange() {
    console.log(this.lengthModificator);
    this.ngOnInit();
  }
}
