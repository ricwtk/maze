# Loading your code

## Create folder

1. In the [folder that you have expanded or cloned](#clone-or-download), create a folder within the `players` folder. There is no specific naming convention that need to follow.

2. Within the player folder, create two files, `group.txt` and `player.py`. 

    - `group.txt` contains the information of your group.
    
    - `player.py` contains the `Player` class, i.e. your code.

    If you need other files for your code to run, you should place them in this folder.

## Folder structure

If your player folder is named `super_player`, this should be the folder structure. 

<svg width="100%" viewBox="0 -20 1000 810">
  <svg class="mdi-folder" x="0" y="0" width="55" height="55" viewBox="0 0 24 24">
    <path fill="black" d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z"/>
  </svg>
  <text dominant-baseline="text-before-edge" x="70" y="5" stroke="transparent" fill="black" style="font-size:28px">maze</text>
  <svg class="mdi-folder" x="50" y="80" width="55" height="55" viewBox="0 0 24 24">
    <path fill="black" d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z"/>
  </svg>
  <text dominant-baseline="text-before-edge" x="120" y="85" stroke="transparent" fill="black" style="font-size:28px">docs</text>
  <svg class="mdi-folder" x="50" y="160" width="55" height="55" viewBox="0 0 24 24">
    <path fill="black" d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z"/>
  </svg>
  <text dominant-baseline="text-before-edge" x="120" y="165" stroke="transparent" fill="black" style="font-size:28px">mazes</text>
  <svg class="mdi-folder" x="50" y="240" width="55" height="55" viewBox="0 0 24 24">
    <path fill="black" d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z"/>
  </svg>
  <text dominant-baseline="text-before-edge" x="120" y="245" stroke="transparent" fill="black" style="font-size:28px">players</text>
  <svg class="mdi-folder" x="100" y="320" width="55" height="55" viewBox="0 0 24 24">
    <path fill="#4DB6AC" d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z"/>
  </svg>
  <text dominant-baseline="text-before-edge" x="170" y="325" stroke="transparent" fill="#4DB6AC" style="font-size:28px">super_player</text>
  <svg class="mdi-file" x="150" y="400" width="55" height="55" viewBox="0 0 24 24">
    <path fill="#4DB6AC" d="M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z"/>
  </svg>
  <text dominant-baseline="text-before-edge" x="220" y="405" stroke="transparent" fill="#4DB6AC" style="font-size:28px">group.txt</text>
  <svg class="mdi-language-python" x="150" y="480" width="55" height="55" viewBox="0 0 24 24">
    <path fill="#4DB6AC" d="M19.14,7.5A2.86,2.86 0 0,1 22,10.36V14.14A2.86,2.86 0 0,1 19.14,17H12C12,17.39 12.32,17.96 12.71,17.96H17V19.64A2.86,2.86 0 0,1 14.14,22.5H9.86A2.86,2.86 0 0,1 7,19.64V15.89C7,14.31 8.28,13.04 9.86,13.04H15.11C16.69,13.04 17.96,11.76 17.96,10.18V7.5H19.14M14.86,19.29C14.46,19.29 14.14,19.59 14.14,20.18C14.14,20.77 14.46,20.89 14.86,20.89A0.71,0.71 0 0,0 15.57,20.18C15.57,19.59 15.25,19.29 14.86,19.29M4.86,17.5C3.28,17.5 2,16.22 2,14.64V10.86C2,9.28 3.28,8 4.86,8H12C12,7.61 11.68,7.04 11.29,7.04H7V5.36C7,3.78 8.28,2.5 9.86,2.5H14.14C15.72,2.5 17,3.78 17,5.36V9.11C17,10.69 15.72,11.96 14.14,11.96H8.89C7.31,11.96 6.04,13.24 6.04,14.82V17.5H4.86M9.14,5.71C9.54,5.71 9.86,5.41 9.86,4.82C9.86,4.23 9.54,4.11 9.14,4.11C8.75,4.11 8.43,4.23 8.43,4.82C8.43,5.41 8.75,5.71 9.14,5.71Z"/>
  </svg>
  <text dominant-baseline="text-before-edge" x="220" y="485" stroke="transparent" fill="#4DB6AC" style="font-size:28px">player.py</text>
  <svg class="mdi-folder" x="50" y="560" width="55" height="55" viewBox="0 0 24 24">
    <path fill="black" d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z"/>
  </svg>
  <text dominant-baseline="text-before-edge" x="120" y="565" stroke="transparent" fill="black" style="font-size:28px">static</text>
  <svg class="mdi-language-python" x="50" y="640" width="55" height="55" viewBox="0 0 24 24">
    <path fill="black" d="M19.14,7.5A2.86,2.86 0 0,1 22,10.36V14.14A2.86,2.86 0 0,1 19.14,17H12C12,17.39 12.32,17.96 12.71,17.96H17V19.64A2.86,2.86 0 0,1 14.14,22.5H9.86A2.86,2.86 0 0,1 7,19.64V15.89C7,14.31 8.28,13.04 9.86,13.04H15.11C16.69,13.04 17.96,11.76 17.96,10.18V7.5H19.14M14.86,19.29C14.46,19.29 14.14,19.59 14.14,20.18C14.14,20.77 14.46,20.89 14.86,20.89A0.71,0.71 0 0,0 15.57,20.18C15.57,19.59 15.25,19.29 14.86,19.29M4.86,17.5C3.28,17.5 2,16.22 2,14.64V10.86C2,9.28 3.28,8 4.86,8H12C12,7.61 11.68,7.04 11.29,7.04H7V5.36C7,3.78 8.28,2.5 9.86,2.5H14.14C15.72,2.5 17,3.78 17,5.36V9.11C17,10.69 15.72,11.96 14.14,11.96H8.89C7.31,11.96 6.04,13.24 6.04,14.82V17.5H4.86M9.14,5.71C9.54,5.71 9.86,5.41 9.86,4.82C9.86,4.23 9.54,4.11 9.14,4.11C8.75,4.11 8.43,4.23 8.43,4.82C8.43,5.41 8.75,5.71 9.14,5.71Z"/>
  </svg>
  <text dominant-baseline="text-before-edge" x="120" y="645" stroke="transparent" fill="black" style="font-size:28px">main.py</text>
  <svg class="mdi-language-markdown" x="50" y="720" width="55" height="55" viewBox="0 0 24 24">
    <path fill="black" d="M20.56 18H3.44C2.65 18 2 17.37 2 16.59V7.41C2 6.63 2.65 6 3.44 6H20.56C21.35 6 22 6.63 22 7.41V16.59C22 17.37 21.35 18 20.56 18M6.81 15.19V11.53L8.73 13.88L10.65 11.53V15.19H12.58V8.81H10.65L8.73 11.16L6.81 8.81H4.89V15.19H6.81M19.69 12H17.77V8.81H15.85V12H13.92L16.81 15.28L19.69 12Z"/>
  </svg>
  <text dominant-baseline="text-before-edge" x="120" y="725" stroke="transparent" fill="black" style="font-size:28px">README.md</text>
  <path d="M 25 55 v 52 h 20 m -20 0 v 80 h 20 m -20 0 v 80 h 20 m -20 0 v 320 h 20 m -20 0 v 80 h 20 m -20 0 v 80 h 20 m -20 0" stroke="black" fill="none" stroke-width="5"/>
  <path d="M 25 55 m 50 240 v 52 h 20" stroke="black" fill="none" stroke-width="5"/>
  <path d="M 25 55 m 100 320 v 52 h 20 m -20 0 v 80 h 20 m -20 0" stroke="black" fill="none" stroke-width="5"/>
</svg>
