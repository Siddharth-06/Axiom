#include "../include/MarketSimulator.hpp"
#include "../include/strategy.hpp"
#include "../include/config.hpp"
#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <cmath>
#include <algorithm>

#include "../json/json.hpp"

using json = nlohmann::json;


using json = nlohmann::json;

SignalType signalFromString(const std::string& s) {
    if (s == "RSI") return SignalType::RSI;
    if (s == "VOLATILITY") return SignalType::VOLATILITY;
    if (s == "VOLATILITY_MA") return SignalType::VOLATILITY_MA;
    if (s == "MA" || s == "SMA") return SignalType::MA_SHORT;

    if (s == "MA" || s == "SMA" || s == "MA_SHORT") return SignalType::MA_SHORT;
    if (s == "MA" || s == "SMA" || s == "MA_SHORT") return SignalType::MA_SHORT;
    if (s == "MA_LONG") return SignalType::MA_LONG;
    if (s == "Price") return SignalType::PRICE;
    return SignalType::PRICE;
}

inline bool evaluateCondition(const MarketSimulator& sim, const Condition& c, int t) {
    double left = sim.getSignal(c.lhs, t);
    double right = 0.0;
    if (c.rhs_type == OperandType::SIGNAL) {
        right = sim.getSignal(c.rhs_signal, t);
    } else {
        right = c.rhs_value;
    }
    if (c.op == '>') return left > right;
    if (c.op == '<') return left < right;
    if (c.op == '=') return std::abs(left - right) < 0.0001;
    return false;
}

int main(int argc, char* argv[]) {
    json input;

int main(int argc, char* argv[]) {
    json input;
    
int main(int argc, char* argv[]) {
    json input;
    
    if (argc > 1) {
        std::ifstream f(argv[1]);
        if (f.is_open()) {
            f >> input;
        } else {
            std::cout << "{ \"error\": \"Cannot open file\" }" << std::endl;
            return 1;
        }
    } else {
        try {
            if (std::cin.peek() == std::ifstream::traits_type::eof()) {
                return 0; 
            }
            std::cin >> input;
        } catch (...) {
            std::cout << "{ \"error\": \"Invalid JSON input\" }" << std::endl;
            return 1;
        }
    }

    Config cfg;
    std::string mkt = input.value("market", "Trending");
    if (mkt == "Mean Reversion" || mkt == "MeanReversion") cfg.market = "MeanReverting";
    else if (mkt == "Sideways") cfg.market = "Sideways";
    else cfg.market = "Trending";

    cfg.timesteps = input.value("timesteps", 1000);
    cfg.seed = input.value("seed", 42);

    MarketSimulator sim(cfg);
    sim.runMarket();

    sim.computeRSI(14);
    sim.computeVolatility(20);
    sim.computeMovingAverage(20, 50); // Short=20, Long=50
    sim.computeMovingAverageOnSignal(SignalType::VOLATILITY, SignalType::VOLATILITY_MA, 50);

    const auto& prices = sim.getPrices();
    bool use_external_prices = input.contains("prices");
    
    MarketSimulator sim(cfg);
    if(use_external_prices){
        std::vector<double> prices = input["prices"].get<std::vector<double>>();
            sim.setPrices(prices);

    else
    sim.runMarket();
    
<<<<<<< HEAD


=======
    auto before = sim.getPrices();
    //sim.registerPriceSignal();
>>>>>>> 10bb505 (serious meow)
    sim.computeRSI(14);
    sim.computeVolatility(20);
    sim.computeMovingAverage(20, 50);
    sim.computeMovingAverageOnSignal(SignalType::VOLATILITY, SignalType::VOLATILITY_MA, 50);
<<<<<<< HEAD
    sim.registerPriceSignal();
    
    const auto& prices = sim.getPrices();

>>>>>>> 9dff4cf (meow)
=======
  
    
    const auto& prices = sim.getPrices();

>>>>>>> 10bb505 (serious meow)
    Strategy strategy;
    strategy.name = "User Strategy";

    auto parseRules = [&](const json& rules, std::vector<Condition>& target) {
        for (const auto& r : rules) {
            Condition c;
<<<<<<< HEAD
<<<<<<< HEAD
        
            c.lhs = signalFromString(r.value("lhs", "Price"));
            std::string op = r.value("op", ">");
            c.op = op[0];
=======
=======
>>>>>>> 10bb505 (serious meow)
            
            c.lhs = signalFromString(r.value("lhs", "Price"));
            
            std::string op = r.value("op", ">");
            c.op = op[0];

<<<<<<< HEAD
>>>>>>> 9dff4cf (meow)
=======
>>>>>>> 10bb505 (serious meow)
            std::string type = r.value("rhs_type", "CONSTANT");
            if (type == "SIGNAL") {
                c.rhs_type = OperandType::SIGNAL;
                c.rhs_signal = signalFromString(r.value("rhs_signal", "Price"));
            } else {
                c.rhs_type = OperandType::CONSTANT;
                c.rhs_value = r.value("rhs_value", 0.0);
            }
            
            target.push_back(c);
        }
    };

    if (input.contains("strategy")) {
        if (input["strategy"].contains("buy")) parseRules(input["strategy"]["buy"], strategy.buy);
        if (input["strategy"].contains("sell")) parseRules(input["strategy"]["sell"], strategy.sell);
    }
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 9dff4cf (meow)
=======

>>>>>>> 10bb505 (serious meow)
    bool in_pos = false;
    double entry_price = 0.0;
    std::vector<json> trades;
    
    double equity = 0.0;
    int win_count = 0;
    int trade_count = 0;
    double max_dd = 0.0;
    double peak = 0.0;

    for (int t = 50; t < (int)prices.size(); t++) {
        
        bool buy_signal = !strategy.buy.empty();
        for (const auto& c : strategy.buy) {
            if (!evaluateCondition(sim, c, t)) {
                buy_signal = false;
                break;
            }
        }

        bool sell_signal = !strategy.sell.empty();
        for (const auto& c : strategy.sell) {
            if (!evaluateCondition(sim, c, t)) {
                sell_signal = false;
                break;
            }
        }

        if (!in_pos && buy_signal) {
            in_pos = true;
            entry_price = prices[t];
            
            trades.push_back({
                {"t", t},
                {"type", "BUY"},
                {"price", prices[t]}
            });
        }
        else if (in_pos && sell_signal) {
            in_pos = false;
            double pnl = prices[t] - entry_price;
            equity += pnl;
            trade_count++;
            if (pnl > 0) win_count++;

            trades.push_back({
                {"t", t},
                {"type", "SELL"},
                {"price", prices[t]},
                {"pnl", pnl}
            });
        }
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 9dff4cf (meow)
=======

>>>>>>> 10bb505 (serious meow)
        peak = std::max(peak, equity);
        double dd = peak - equity;
        if (dd > max_dd) max_dd = dd;
    }

<<<<<<< HEAD
    json output;
    output["prices"] = prices;
    output["trades"] = trades;
<<<<<<< HEAD
=======
    
>>>>>>> 9dff4cf (meow)
=======
    const auto after = sim.getPrices();
    assert(before == after);

    json output;
    output["prices"] = prices;
    output["trades"] = trades;
    
>>>>>>> 10bb505 (serious meow)
    output["metrics"] = {
        {"total_pnl", std::round(equity * 100.0) / 100.0},
        {"num_trades", trade_count},
        {"win_rate", trade_count > 0 ? (double)win_count/trade_count : 0.0},
        {"max_drawdown", std::round(max_dd * 100.0) / 100.0}
    };
<<<<<<< HEAD
<<<<<<< HEAD
    std::cout << output.dump() << std::endl;

=======
=======
>>>>>>> 10bb505 (serious meow)

    std::cout << output.dump() << std::endl;

    return 0;
<<<<<<< HEAD
>>>>>>> 9dff4cf (meow)
=======
>>>>>>> 10bb505 (serious meow)
}
