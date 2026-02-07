#pragma once
<<<<<<< HEAD

#include <string>

using namespace std;
struct Config{
    string market;
    int timesteps;
    unsigned int seed;
=======
#include <string>

struct Config {
    std::string market = "Trending";
    int timesteps = 1000;
    unsigned seed = 42;
>>>>>>> 9dff4cf (meow)
};
