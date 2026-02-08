#pragma once
#include <vector>
#include <unordered_map>
#include <random>
#include "config.hpp"
#include "PriceSeries.hpp"

enum class SignalType {
    PRICE,
    MA_SHORT,
    MA_LONG,
    RSI,
    VOLATILITY,
    VOLATILITY_MA
};

<<<<<<< HEAD
<<<<<<< HEAD

class MarketSimulator {
public:
    MarketSimulator(const Config& cfg);
    void runMarket();
    void computeMovingAverage(int short_w, int long_w);
    const std::vector<double>& getPrices() const;
    std::vector<SignalType> getAvailableSignals() const;
    double getSignal(SignalType type, int t) const;
    void computeRSI(int period);
    void computeVolatility(int window);
    void computeMovingAverageOnSignal(
        SignalType src,
        SignalType dst,
        int window
    );
    static std::string signalName(SignalType s);


private:
    Config config;
    std::mt19937 rng;
    double stepTrending(double price);
    double stepSideways(double price);
    double stepMeanReverting(double price);
    std::vector<double> prices;
    std::unordered_map<SignalType, std::vector<double>> signals;
};



=======
=======
>>>>>>> 10bb505 (serious meow)
class MarketSimulator {
public:
    MarketSimulator(const Config& cfg);
    
<<<<<<< HEAD
    // Phase 1: Generate price series
    void runMarket();

    // Phase 2: Compute indicators
=======
    
    void runMarket();

    
>>>>>>> 10bb505 (serious meow)
    void computeMovingAverage(int short_w, int long_w);
    void computeRSI(int period);
    void computeVolatility(int window);
    void computeMovingAverageOnSignal(SignalType src, SignalType dst, int window);
    void setPrices(const std::vector<double>& externalPrices);
    void registerPriceSignal();
    
    const std::vector<double>& getPrices() const;
    std::vector<SignalType> getAvailableSignals() const;
    double getSignal(SignalType type, int t) const;
    static std::string signalName(SignalType s);

private:
    Config config;
    std::mt19937 rng;
    
    double stepTrending(double price);
    double stepSideways(double price);
    double stepMeanReverting(double price);
    
    std::vector<double> prices;
<<<<<<< HEAD
    std::unordered_map<SignalType, std::vector<double>> signals;
};
>>>>>>> 9dff4cf (meow)
=======
    bool external_prices = false;
    std::unordered_map<SignalType, std::vector<double>> signals;
};
>>>>>>> 10bb505 (serious meow)
