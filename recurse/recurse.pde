void recurse(int level) {
  if (level == MAX) {
    return;
  } else {
    hue = (hue0 + level/MAX * 255) % 255;
    bright = (150 + level/MAX * 255) % 200;
    stroke(hue, 255, bright);

    pushMatrix();
    rotate(rotL);
    float len = LEN * pow(0.66, level); //avoid division by zero
    translate(len, 0);
    line(0, 0, -len, 0);
    recurse(level + 1);
    popMatrix();

    pushMatrix();
    rotate(rotR);
    float len = LEN * pow(0.66, level); //avoid division by zero
    translate(len, 0);
    line(0, 0, -len, 0);
    recurse(level + 1);
    popMatrix();
  }
}

int MAX = 10;
int LEN = 150;
float hue = 255;
float bright = 128;
float hue0 = 0;
float rotR = PI;
float rotL = -PI;
int n = 1;

void setup() {
  size(1500, 900);
  background(0);
  frameRate(60);
  colorMode(HSB);

  stroke(hue, 255, 255);
}

void draw() {
  //background(0);
  colorMode(RGB);
  fill(0, 0, 0, 1);
  rect(0, 0, width, height);
  colorMode(HSB);
  translate(width/2, height/2);
  rotate(-HALF_PI);

  rotR += radians(0.33);///n; //harmonic series diverges
  rotL -= radians(.7);///n;
  ++n;
  hue0 = (hue0 +1) % 255;


  recurse(0);
}
