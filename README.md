# HAC-Cube
> A cube timer project

### Use directly on [https://cube.hac.rf.gd](https://cube.hac.rf.gd)

---

### Features
- [x] Support _**2x2**_ - _**7x7**_ _**Pyraminx**_, _**Megaminx**_, _**Skewb**_, _**Square-1**_, _**Clock**_
- [x] Support _**\+2**_ and _**DNF**_
- [x] Draw Scramble

---

### Problem
if there's anything wrong
*(eg. something doesn't show up, css not working)*

it might because of your browser cache and the new updates

follow these steps: 
1. goto [chrome://settings/clearBrowserData](chrome://settings/clearBrowserData)
1. ONLY select **CACHE** then press clear
1. refresh HAC-Cube
1. press <kbd>ctrl+shift+p</kbd> then type `update`
1. this might fix the problem
1. but if it's not, submit it to [Issues](https://github.com/GhostShadow0316/HAC-Cube/issues)

---

### !!! NEW FEATURE !!!
#### Keyboard Control
> press <kbd>ctrl+shift+p</kbd> to open up command palette

commands:
- `update`: if there's any problem, try this command!

- `help`: show a command help page
<br><br>

- `cube [cube]`: change cube

- `next`: next scramble

- `punish [+2/DNF]`: set punish to current solve (leave empty for clear punish)

- `view [index]`: view solve to no. _**[index]**_

- `edit punish [index] [+2/DNF]`: set punish to solve no. _**[index]**_ (leave empty for clear punish)

- `remove [idx]`: remove solve no. _**[index]**_

- `copy`
    - `scramble` or `sc`: copy current scramble

    - `time`: copy current solve time

- `session`
    - `[name]` or ` = [name]` or `change [name]`: switch between sessions
    
    - ` + [name]` or `add [name]`: add new session
    
    - ` - [name]` or `remove [name]`: remove existed session

- `reset`: the old _**fix**_ command, use it will remove all your progress

- `export`: export sessions as a json file

- `import`: import sessions from a json file

---

### !!! NEW FEATURE !!!
#### Import and Export Session
> Save your session in different devices

you can now use command `import` and `export` to **import** and **export** session

it now only supports files exported from here, 
but it'll support more formats from other timers soon!

---

<br><br><br>

- latest update on 2023-12-15
