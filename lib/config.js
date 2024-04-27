const config = [
  {
    chainId: 10,
    chainName: "Optimism",
    isBase: true,
    rpcUrl: "https://lb.nodies.app/v1/9aa344a56a444c88a87b6d767eebbe8a",
    convert_id: "2781",
    id: "1027",
    symbol: "ETH",
    logo: "/eth-logo.svg",
    addresses: {
      Valerium: "0xE2863dBFFC36100cd77160d74F4bb97344E0AD42",
      ValeriumForwarder: "0x40C92d2E370b3d3944fDd90c922a407F02D286d1",
      FactoryForwarder: "0x44950f083691828A07c17d2A927B435e8B272F6D",
      ValeriumProxyFactory: "0x0B62BDA8EcE17AFfa7adAe16bBaBBC8584A30016",
      ValeriumVault: "0x1275917daAE6389C61c7B1E8199724D0b46Ed10f",
      PasswordVerifier: "0x0c17B9e142a0DDb42f075b0E2f1988691ea1d75a",
      SignatureVerifier: "0xC4e20B3BD1922A02c6DAC500De5754E3CC4046BB",
      ValeriumGasTank: "0xd276eC25c2C4670B067b9CF726b7BfCADB191107",
    },
    style: {
      baseTextColor: "#FFFFFF",
      colorDark: "#FF0420",
      colorLight: "#FF0420",
      gradientColorDark:
        "linear-gradient(93deg, rgba(255, 4, 32, 0.40) 0%, rgba(153, 2, 19, 0.40) 100%)",
      gradientColorLight:
        "linear-gradient(93deg, rgba(255, 4, 32, 0.80) 0%, rgba(153, 2, 19, 0.80) 100%)",
      backgroundColorDark: "rgba(255, 4, 32, 0.40)",
      backgroundColorLight: "rgba(255, 4, 32, 0.20)",
      backgroundShadowEffect:
        "linear-gradient(40deg, rgba(255, 255, 255, 0.00) 60%, rgba(255, 74, 94, 0.00) 60%, rgba(255, 4, 32, 0.80) 100%)",
      logo: "/optimism-logo.svg",
    },
    tokens: [
      {
        name: "ETH",
        symbol: "ETH",
        address: null,
        convert_id: "1027",
        usd_id: "2781",
        decimals: 18,
        logo: "/eth-logo.svg",
      },
      {
        name: "USDC",
        symbol: "USDC",
        address: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
        convert_id: "3408",
        usd_id: "2781",
        decimals: 6,
        logo: "/usdc-logo.svg",
      },
    ],
  },
  {
    chainId: 8453,
    chainName: "Base",
    isBase: false,
    rpcUrl: "https://lb.nodies.app/v1/6411cfac25ba4ecdbe8b81460f7bf597",
    convert_id: "2781",
    id: "1027",
    symbol: "ETH",
    logo: "/eth-logo.svg",
    addresses: {
      Valerium: "0x403C415b937670D1cE5990085D1d2a4bfBcD963d",
      ValeriumForwarder: "0x0c17B9e142a0DDb42f075b0E2f1988691ea1d75a",
      FactoryForwarder: "0x1275917daAE6389C61c7B1E8199724D0b46Ed10f",
      ValeriumProxyFactory: "0x44950f083691828A07c17d2A927B435e8B272F6D",
      ValeriumVault: "0xC4e20B3BD1922A02c6DAC500De5754E3CC4046BB",
      PasswordVerifier: "0xE34906Eda6Cf2cafFa1d567523C7954fDf9E80E0",
      SignatureVerifier: "0x21709908c8c8aA55F20Be21F58E79352A9b7D790",
      ValeriumGasTank: "0xd276eC25c2C4670B067b9CF726b7BfCADB191107",
    },
    style: {
      baseTextColor: "#FFFFFF",
      colorDark: "#0052FF",
      colorLight: "#0052FF",
      gradientColorDark:
        "linear-gradient(93deg, rgba(0, 82, 255, 0.40) 0%, rgba(0, 49, 153, 0.40) 100%)",
      gradientColorLight:
        "linear-gradient(93deg, rgba(0, 82, 255, 0.80) 0%, rgba(0, 49, 153, 0.80) 100%)",
      backgroundColorDark: "rgba(0, 82, 255, 0.40)",
      backgroundColorLight: "rgba(0, 82, 255, 0.20)",
      backgroundShadowEffect:
        "linear-gradient(40deg, rgba(255, 255, 255, 0.00) 60%, rgba(85, 140, 255, 0.00) 60%, rgba(0, 82, 255, 0.9) 100%)",
      logo: "/base-logo.svg",
    },

    tokens: [
      {
        name: "ETH",
        symbol: "ETH",
        address: null,
        convert_id: "1027",
        usd_id: "2781",
        decimals: 18,
        logo: "/eth-logo.svg",
      },
      {
        name: "USDC",
        symbol: "USDC",
        address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        convert_id: "3408",
        usd_id: "2781",
        decimals: 6,
        logo: "/usdc-logo.svg",
      },
    ],
  },
  {
    chainId: 34443,
    chainName: "Mode",
    isBase: false,
    rpcUrl: "https://mainnet.mode.network",
    convert_id: "2781",
    id: "1027",
    symbol: "ETH",
    logo: "/eth-logo.svg",
    addresses: {
      Valerium: "0xA5e1E31EBC1a78Db93944EC050E865E9022974A1",
      ValeriumForwarder: "0x44950f083691828A07c17d2A927B435e8B272F6D",
      FactoryForwarder: "0x1275917daAE6389C61c7B1E8199724D0b46Ed10f",
      ValeriumProxyFactory: "0x40C92d2E370b3d3944fDd90c922a407F02D286d1",
      ValeriumVault: "0xC4e20B3BD1922A02c6DAC500De5754E3CC4046BB",
      PasswordVerifier: "0xE34906Eda6Cf2cafFa1d567523C7954fDf9E80E0",
      SignatureVerifier: "0x21709908c8c8aA55F20Be21F58E79352A9b7D790",
      ValeriumGasTank: "0xDA5254B58546EBe4D87E3799f83C5bE5043Ff89A",
    },
    style: {
      baseTextColor: "#000000",
      colorDark: "#DFFE00",
      colorLight: "#000000",
      gradientColorDark:
        "linear-gradient(93deg, rgba(223, 254, 0, 0.80) 0%, rgba(133, 151, 0, 0.80) 100%)",
      gradientColorLight:
        "linear-gradient(93deg, rgba(223, 254, 0, 0.80) 0%, rgba(133, 151, 0, 0.80) 100%)",
      backgroundColorDark: "rgba(165, 188, 0, 0.40)",
      backgroundColorLight: "rgba(165, 188, 0, 0.20)",
      backgroundShadowEffect:
        "linear-gradient(40deg, rgba(255, 255, 255, 0.00) 60%, rgba(223, 254, 0, 0.00) 60%, rgba(223, 254, 0, 0.90) 100%)",
      logo: "/mode-logo.svg",
    },

    tokens: [
      {
        name: "ETH",
        symbol: "ETH",
        address: null,
        convert_id: "1027",
        usd_id: "2781",
        decimals: 18,
        logo: "/eth-logo.svg",
      },
      {
        name: "USDC",
        symbol: "USDC",
        address: "0xd988097fb8612cc24eeC14542bC03424c656005f",
        convert_id: "3408",
        usd_id: "2781",
        decimals: 6,
        logo: "/usdc-logo.svg",
      },
    ],
  },
];

export default config;
