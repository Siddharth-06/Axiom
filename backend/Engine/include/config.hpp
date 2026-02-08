#pragma once
#include <string>

struct Config {
    std::string market = "Trending";
    int timesteps = 1000;
    unsigned seed = 42;
};
