import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColourPickerService {
  private colours: Array<string> = Array();
  private usedColours: Array<string> = Array();
  
  constructor() { 
    this.loadColours();
  }

  getRandomColour = () => this.getRandomElementFromArray(this.colours, this.usedColours);

  private loadColours = () => this.colours = [
    "#FFCE30",
    "#E83845",
    "#E389B9",
    "#746AB0",
    "#288BA8"
  ]

  private getRandomElementFromArray(array: Array<string>, usedArray: Array<string>): string {
    let filteredArray = array.filter(element => !usedArray.includes(element));
    if (filteredArray.length === 0) {
      usedArray = new Array<string>();
      array.forEach(element => filteredArray.push(element));
    }
    const index = Math.floor(Math.random() * filteredArray.length);
    const element = filteredArray[index];
    if (!element) {
      console.error("The element was underfined at index " + index, filteredArray);
      return element;
    }
    usedArray.push(element);
    return element;
  }

}
