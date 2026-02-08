#pragma once
<<<<<<< HEAD
<<<<<<< HEAD

#include <string>

using namespace std;
struct Config{
    string market;
    int timesteps;
    unsigned int seed;
=======
=======
>>>>>>> 10bb505 (serious meow)
#include <string>

struct Config {
    std::string market = "Trending";
    int timesteps = 1000;
    unsigned seed = 42;
<<<<<<< HEAD
>>>>>>> 9dff4cf (meow)
=======
>>>>>>> 10bb505 (serious meow)
};
