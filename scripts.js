
var rect_x_pos = new Array(0);
var rect_y_pos = new Array(0);
var rect_widths = new Array(0);
var rect_heights = new Array(0);
var rect_animation_speeds = new Array(0);
var rect_colors = new Array(0);
var rect_vertical_offset = new Array(0);

var incrementer = 0;
var amount = 0;

addEventListener("resize", (event) => {document.getElementById("svg_page").setAttribute("width", window.innerWidth)});

function angleToRadian(angle){

    return angle * Math.PI / 180;
}


function createOrGetSVG(){
    var main_svg = document.getElementById('svg_page');
    if(main_svg == null){
        main_svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        let client_width = window.innerWidth;
        let client_heght = window.innerHeight;

        main_svg.setAttribute('width', client_width);
        main_svg.setAttribute('height', client_heght);
        main_svg.setAttribute('id', 'svg_page');
    }

    main_svg.innerHTML = '';

    var svg_style = document.createElement("style");

    svg_style.setAttribute('id', 'svg_style');

    main_svg.appendChild(svg_style);

    document.getElementById('testdiv').appendChild(main_svg);
}

function resize() {

    createOrGetSVG();

    document.getElementById("angles").value = "-6";

    createHorizontalBars();
}


// відповідає за анімацію виїжджання/заїжджання правого div'у
function settings_click(){
    var divis = document.getElementById("right_sec");

    var isOpen = divis.style.left == "75%" ? true : false;

    console.log(isOpen);

    if(!isOpen){

        divis.style.left = "100%";
        setTimeout(function() {divis.style.left = "75%";}, 900);
        divis.style.animation = "1s linear open";

    }

    else{
        setTimeout(function() {divis.style.left = "-100000px";}, 900);
        divis.style.animation = "1s linear close";

    }
}


// отримує випадкове ціле число у інтервалі [min ; max]
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// вираховує займану ширину повернутої на певний градус фігури
function getFigureWidth(width, length, sinus, cosinus){
    return Math.abs(length * sinus) + Math.abs(width * cosinus);
}


//габела...
function generateAnimationTime(min, max, step){

    let iterations = (max - min)/step;

    console.log(iterations);

    let plus = getRandomIntInclusive(0, iterations);

    console.log(plus);
    plus*=step;

    return Number(min)+Number(plus);


}

// створює анімацію їзди вверх-вниз за кутом по заданому часу
function generateAnimation(xoffset, yoffset){

    var svgstyle = document.getElementById("svg_style");

    let newanim = `\n@keyframes rect${incrementer}_move1{ 0%{} 50%{transform: translate(${xoffset}px, ${yoffset}px)} 100%{}}`;
    let defineanim = `#r${incrementer}{ animation: ${getRandomIntInclusive(10, 50)*0.1}s rect${incrementer}_move1; animation-iteration-count: infinite}\n`;

    svgstyle.innerHTML = defineanim + svgstyle.innerHTML + newanim;


    console.log(xoffset + "; " + yoffset);
}

function generateAnimation2(xoffset, yoffset, time){

    var svgstyle = document.getElementById("svg_style");

    let newanim = `\n@keyframes rect${incrementer}_move1{ 0%{} 50%{transform: translate(${xoffset}px, ${yoffset}px)} 100%{}}`;
    let defineanim = `#r${incrementer}{ animation: ${time / 1000}s rect${incrementer}_move1; animation-iteration-count: infinite}\n`;

    svgstyle.innerHTML = defineanim + svgstyle.innerHTML + newanim;

    //console.log(xoffset + "; " + yoffset + "; " + time);
}

function generateAngledRect2(x, y, angle, width, length, min_offset, max_offset){

    let angle_cos = Math.cos(angleToRadian(angle));
    let angle_sin = Math.sin(angleToRadian(angle));

    let random_offset = getRandomIntInclusive(min_offset, max_offset);

    let start_pos =  angle >= 0 ? `M ${x - random_offset*angle_sin} ${y + random_offset * angle_cos}`: `M ${x + random_offset*angle_sin} ${y + random_offset * angle_cos}`;

    let starting_y = y+random_offset*angle_cos;
    let height_to_move = window.innerHeight - starting_y;

    generateAnimation(angle >= 0 ? -angle_sin*height_to_move: -angle_sin*height_to_move, height_to_move * angle_cos);

    let line1 = angle < 0 ? `l ${width * angle_cos} ${width * angle_sin}` : `l ${-length * angle_sin} ${length * angle_cos}`;
    let line2 = angle < 0 ? `l ${-length * angle_sin} ${length * angle_cos}` : `l ${-width * angle_cos} ${-width * angle_sin}`;
    let line3 = angle < 0 ? `l ${-width * angle_cos} ${-width * angle_sin}` : `l ${length * angle_sin} ${-length * angle_cos}`;

    var generated_rect = document.createElement("path");
    generated_rect.setAttribute('id', `rect${incrementer}`);
    generated_rect.setAttribute('d', `${start_pos} ${line1} ${line2} ${line3} Z`);
    generated_rect.setAttribute('fill', `rgb(${getRandomIntInclusive(0, 255)}, ${getRandomIntInclusive(0, 255)}, ${getRandomIntInclusive(0, 255)})`);



    let result = `<path id = 'r${incrementer}' d = '${start_pos} ${line1} ${line2} ${line3} Z' fill = 'rgb(${getRandomIntInclusive(0, 255)}, ${getRandomIntInclusive(0, 255)}, ${getRandomIntInclusive(0, 255)})'/>\n`;

    //console.log(generated_rect);


    let svg_container = document.getElementById('svg_page');

    svg_container.insertAdjacentHTML('beforeend', result);

    //svg_container.appendChild(generated_rect);

    document.getElementById('testdiv').innerHTML = "";
    document.getElementById('testdiv').appendChild(svg_container);
}

function generateAngledRect3(x, y, angle, width, length, r, g, b, anim_time, offset){

    let angle_cos = Math.cos(angleToRadian(angle));
    let angle_sin = Math.sin(angleToRadian(angle));

    let start_pos =  angle >= 0 ? `M ${x - offset*angle_sin} ${y + offset * angle_cos}`: `M ${x + offset*angle_sin} ${y + offset * angle_cos}`;
    let starting_y = y+offset*angle_cos;

    let height_to_move = window.innerHeight - starting_y;

    generateAnimation2(-angle_sin*height_to_move, height_to_move*angle_cos, anim_time);

    let line1 = angle < 0 ? `l ${width * angle_cos} ${width * angle_sin}` : `l ${-length * angle_sin} ${length * angle_cos}`;
    let line2 = angle < 0 ? `l ${-length * angle_sin} ${length * angle_cos}` : `l ${-width * angle_cos} ${-width * angle_sin}`;
    let line3 = angle < 0 ? `l ${-width * angle_cos} ${-width * angle_sin}` : `l ${length * angle_sin} ${-length * angle_cos}`;

    let result = `<path id = 'r${incrementer}' d = '${start_pos} ${line1} ${line2} ${line3} Z' fill = 'rgb(${r}, ${g}, ${b})'/>\n`;

    let svg_container = document.getElementById('svg_page');

    svg_container.insertAdjacentHTML('beforeend', result);

    document.getElementById('testdiv').innerHTML = "";
    document.getElementById('testdiv').appendChild(svg_container);
}


function createHorizontalBars(){

    createOrGetSVG();

    let start_with_space = getRandomIntInclusive(1, 2) % 2 == 0 ? true : false;
    let filled_width = 0.0;

    let angle = document.getElementById("angles").valueAsNumber;

    if(start_with_space) filled_width += getRandomIntInclusive(10, 50);

    let svg_width = document.getElementById("svg_page").clientWidth;

    while(filled_width <= svg_width){

        //console.log(filled_width);

        let rand_width = getRandomIntInclusive(20, 40);
        let rand_height = getRandomIntInclusive(60, 90);

        let fig_width = getFigureWidth(rand_width, rand_height, Math.sin(angleToRadian(angle)), Math.cos(angleToRadian(angle)));

        let xpos = angle >=  0 ? filled_width + fig_width : filled_width ;
        let ypos = 0;


        generateAngledRect2(xpos, ypos, angle, rand_width, rand_height, -20, 100);

        let interval = getRandomIntInclusive(fig_width * 1.1, fig_width * 1.2);

        filled_width = filled_width + fig_width + (interval - fig_width);

        incrementer++;
    }

    document.getElementById("angles").value = angle;
    document.getElementById("min_width").value = 20;
    document.getElementById("max_width").value = 40;
    document.getElementById("min_height").value = 60;
    document.getElementById("max_height").value = 90;
    document.getElementById("blank_choice").checked = start_with_space;
    document.getElementById("r_min").value = 0;
    document.getElementById("r_max").value = 255;
    document.getElementById("g_min").value = 0;
    document.getElementById("g_max").value = 255;
    document.getElementById("b_min").value = 0;
    document.getElementById("b_max").value = 255;

    document.getElementById("lesser_color").style.backgroundColor = `rgb(0,0,0)`;
    document.getElementById("bigger_color").style.backgroundColor = `rgb(255,255,255)`;



    document.getElementById("min_anim").value = 1000;
    document.getElementById("max_anim").value = 5000;
    document.getElementById("anim_step").value = 100;
    document.getElementById("offset_min").value = -20;
    document.getElementById("offset_max").value = 100;

    console.log(CheckAllFields());

    amount = incrementer;
}

function createHorizontalBars2(){

    createOrGetSVG();

    addEventListener("resize", (event) => {document.getElementById("svg_page").setAttribute("width", window.innerWidth)});

    let start_with_space = document.getElementById("blank_choice").checked;

    let filled_width = 0.0;

    if(start_with_space) filled_width += getRandomIntInclusive(10, 50);

    let svg_width = window.innerWidth;//document.getElementById("svg_page").clientWidth;

    while(filled_width <= svg_width){

        let angle = document.getElementById("angles").value;

        let random_width = getRandomIntInclusive(document.getElementById("min_width").value, document.getElementById("max_width").value);
        let random_height = getRandomIntInclusive(document.getElementById("min_height").value, document.getElementById("max_height").value);

        let fig_width = getFigureWidth(random_width, random_height, Math.sin(angleToRadian(angle)), Math.cos(angleToRadian(angle)));

        let xpos = angle >=  0 ? filled_width + fig_width : filled_width ;
        let ypos = 0;

        let random_r = getRandomIntInclusive(document.getElementById("r_min").value, document.getElementById("r_max").value);
        let random_g = getRandomIntInclusive(document.getElementById("g_min").value, document.getElementById("g_max").value);
        let random_b = getRandomIntInclusive(document.getElementById("b_min").value, document.getElementById("b_max").value);

        let anim_time = generateAnimationTime(document.getElementById("min_anim").value, document.getElementById("max_anim").value, document.getElementById("anim_step").value);

        console.log(anim_time);

        let offset = getRandomIntInclusive(document.getElementById("offset_min").value, document.getElementById("offset_max").value);

        generateAngledRect3(xpos, ypos, angle, random_width, random_height, random_r, random_g, random_b, anim_time, offset);

        let interval =  getRandomIntInclusive(fig_width * 1.1, fig_width * 1.2);
        filled_width = filled_width + fig_width + (interval - fig_width);

        incrementer++;
    }
    amount = incrementer;
}

function randomizeFields(){

    let angle = getRandomIntInclusive(-14, 14);

    let min_width = getRandomIntInclusive(1, 18);
    let max_width = getRandomIntInclusive(min_width*1.5, min_width*3);

    let min_height = getRandomIntInclusive(max_width * 2, max_width * 3);
    let max_height = getRandomIntInclusive(min_height*1.5, min_height*2);

    let start_with_blank = getRandomIntInclusive(1, 2) % 2 == 0 ? true: false;

    let r_min = getRandomIntInclusive(0, 255);
    let r_max = getRandomIntInclusive(r_min, 255);

    let g_min = getRandomIntInclusive(0, 255);
    let g_max = getRandomIntInclusive(g_min, 255);

    let b_min = getRandomIntInclusive(0, 255);
    let b_max = getRandomIntInclusive(b_min, 255);

    let min_anim_time = getRandomIntInclusive(1000, 2000);
    let max_anim_time = getRandomIntInclusive(min_anim_time* 1.5, min_anim_time*3);
    let animation_step = getRandomIntInclusive(90, 150);

    let min_offset = getRandomIntInclusive(0, 10);
    let max_offset = getRandomIntInclusive(min_offset*1.5, min_offset * 3);

    document.getElementById("angles").value = angle;
    document.getElementById("min_width").value = min_width;
    document.getElementById("max_width").value = max_width;
    document.getElementById("min_height").value = min_height;
    document.getElementById("max_height").value = max_height;
    document.getElementById("blank_choice").checked = start_with_blank;
    document.getElementById("r_min").value = r_min;
    document.getElementById("r_max").value = r_max;
    document.getElementById("g_min").value = g_min;
    document.getElementById("g_max").value = g_max;
    document.getElementById("b_min").value = b_min;
    document.getElementById("b_max").value = b_max;

    document.getElementById("lesser_color").style.backgroundColor = `rgb(${r_min}, ${g_min}, ${b_min})`;
    document.getElementById("bigger_color").style.backgroundColor = `rgb(${r_max}, ${g_max}, ${b_max})`;



    document.getElementById("min_anim").value = min_anim_time;
    document.getElementById("max_anim").value = max_anim_time;
    document.getElementById("anim_step").value = animation_step;
    document.getElementById("offset_min").value = min_offset;
    document.getElementById("offset_max").value = max_offset;
}

function CheckAllFields(){

    if(document.getElementById("angles").value > 90 || document.getElementById("angles").value < -90) return false;
    if(document.getElementById("min_width").value <= 0 || document.getElementById("min_width").value > document.getElementById("max_width").value || document.getElementById("max_width").value <= 0) return false;
    if(document.getElementById("min_height").value <= 0 || document.getElementById("min_height").value > document.getElementById("max_height").value || document.getElementById("max_height").value <= 0) return false;
    if(document.getElementById("r_min").value < 0 || document.getElementById("r_min").value > document.getElementById("r_max").value || document.getElementById("r_max").value > 255) return false;
    if(document.getElementById("g_min").value < 0 || document.getElementById("g_min").value > document.getElementById("g_max").value || document.getElementById("g_max").value > 255) return false;
    if(document.getElementById("b_min").value < 0 || document.getElementById("b_min").value > document.getElementById("b_max").value || document.getElementById("b_max").value > 255) return false;

    if(document.getElementById("min_anim").value <= 0 || document.getElementById("min_anim").value > document.getElementById("max_anim").value || document.getElementById("anim_step").value <= 0) return false;
    if(document.getElementById("offset_min").value > document.getElementById("offset_max").value) return false;

    return true;
}


