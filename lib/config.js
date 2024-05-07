const config = [
  {
    chainId: 1891,
    chainName: "LightLink",
    isBase: true,
    rpcUrl: "https://replicator.pegasus.lightlink.io/rpc/v1",
    convert_id: "2781",
    id: "1027",
    symbol: "ETH",
    logo: "/eth-logo.svg",
    addresses: {
      Valerium: "0x403C415b937670D1cE5990085D1d2a4bfBcD963d",
      ValeriumForwarder: "0x317EA248E82581b42cbec0969e21EB5cd66F0685",
      FactoryForwarder: "0xB182B9d882BD096dA31BCEA102B87B3649857f98",
      ValeriumProxyFactory: "0x9b6f84C2BCd64616dB448D8ED82038cC07E1fe59",
      ValeriumVault: "0x1FdD0B22E4208F6CeE8F8C1Bdbf28bBBc359A86F",
      PasswordVerifier: "0x3D3851032b6485dD65AdBB45bA37b18615006493",
      SignatureVerifier: "0x62CB235Cf18Af7b62B918d93DA89212bc89daFdc",
      ValeriumGasTank: "0x51781cc1439BD05a85185C8c8CEc979b263236e3",
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
        address: "0x3cf2c147d43C98Fa96d267572e3FD44A4D3940d4",
        convert_id: "3408",
        usd_id: "2781",
        decimals: 6,
        logo: "/usdc-logo.svg",
      },
    ],
  },
  {
    chainId: 11155420,
    chainName: "Optimism Sepolia",
    isBase: false,
    rpcUrl: "https://public.stackup.sh/api/v1/node/optimism-sepolia",
    convert_id: "2781",
    id: "1027",
    symbol: "ETH",
    logo: "/eth-logo.svg",
    addresses: {
      Valerium: "0x44950f083691828A07c17d2A927B435e8B272F6D",
      ValeriumForwarder: "0x0c17B9e142a0DDb42f075b0E2f1988691ea1d75a",
      FactoryForwarder: "0xC4e20B3BD1922A02c6DAC500De5754E3CC4046BB",
      ValeriumProxyFactory: "0xA309E24E085D8b9379e8500850a5EE361A1B9A34",
      ValeriumVault: "0xE34906Eda6Cf2cafFa1d567523C7954fDf9E80E0",
      PasswordVerifier: "0x0B62BDA8EcE17AFfa7adAe16bBaBBC8584A30016",
      SignatureVerifier: "0x40C92d2E370b3d3944fDd90c922a407F02D286d1",
      ValeriumGasTank: "0x51781cc1439BD05a85185C8c8CEc979b263236e3",
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
        address: "0x5fd84259d66Cd46123540766Be93DFE6D43130D7",
        convert_id: "3408",
        usd_id: "2781",
        decimals: 6,
        logo: "/usdc-logo.svg",
      },
    ],
  },
];

export default config;
