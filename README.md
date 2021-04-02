# AnchorageKR-Blockchain-_REALCHECK

##Abstract
Bitcoin Blockchain Transaction을 추적하고 새로운 Tx가 발생하면 알려주는 watchbot을 개발.

Bitcoin Blockchain은 매 블럭마다 수천의 Transaction이 새로 기록이 되며, 이 블록에 기록되기 위한 Mempool을 비롯하여 최근에는 Lighting Network를 기록하는 등의 행위가 일어나고 있다. Bitcoin 을 사용하다 보면 지정된 거래가 언제 예정되어 이루어 질 것인지 파악하는 것이 중요한데, 이를 Callback 해주는 등의 알림을 주는 watchbot을 운영한다면 향후 Bitcoin을 이용한 다양한 거래에 도움이 될 것이다.

##Stack

###Bitcoin Blockchain 기초

Bitcoin은 현존하는 Blockchain의 기본 Concept 기반이라 봐도 무방하며, 실제 가장 큰 규모로 활용되는 동시에 가장 견고한 형태의 Blockchain이다. SHA256 기반의 Hash알고리즘을 통한 Private Key, Public Key Pair를 지닌 계정을 생성하여 다른 계정과 Bitcoin을 사용하여 거래할 수 있다.

###Hash 알고리즘

비가역의 특징을 지니고 있는 불연속성 결과물을 도출하는 함수로서, 인자값의 변화를 민감하게 감지 할 수 있다. Hash를 통하여 특정 결과값을 가지는 값을 도출하는 방법은 대개 무작위로 대입하여 Matching하는 방법 뿐인데, 이에 상당량의 Computing 자원이 소모된다. 이는 Bitcoin Blockchain을 어우르는 암호학 기술의 핵심이라 할 수 있다.

###Web/Native App개발

Web 및 Android, iOS등의 Native 환경에서 기능 수행하기 위해서는 각 환경에 맞는 패키징의 App이 필요하다. React Native나 Flutter등의 다양한 사용환경을 하나 Framework로 개발하는 방법도 있으며, 필요에 따라 각 플랫폼에 적합한 Framework을 별도로 선정하여 개발하거나, 직접 App을 개발할 수 있다.

###Backend 기반지식

원하는 내역이 Bitcoin Blockchain 또는 L2 에 존재하는 지 확인하고, 이들이 기록을 추적 및 정리하여 기록하고 알림을 전송해야하므로 Blockchain 내부를 research할 수 있는 Backend 기반지식이 필요함. 또한 Backend의 소요되는 비용을 최적화 할 수 있어야함.

##Flow

###local DB에 Transaction을 추적할 Pub Key 등록

###주기적으로 새로운 거래가 생성되는지, 잔고의 변화가 있는지 확인한다.

###상태 업데이트

최초 발견 이후 transaction이 최종적으로 confirm될 수 있는 조건을 갖추었는지 지속적으로 업데이트 하고, 이를 Callback 한다.

#Mission

##Bitcoin address watcher 개발

Bitcoin Blockchain 에 등록되는 다양한 address의 잔고 및 xpub등의 다양한 속성을 파악하고 이를 지속적으로 확인할 수 있는 watcher를 개발한다.

##Bitcoin Transaction watcher 개발

Bitcoin Blockchain Mempool 또는 Lighting Network를 통해 신규로 생성되거나 대기하는 Transaction을 확인하고, 확인된 Tx가 언제 완결성을 지닐 수 있는지 그 기준과 함께 주기적으로 관찰하는 watcher를 개발한다.

##최적화된 비용의 Callback 개발

Mempool에는 Satoshi별 다양한 Tx가 들어오고, 또한 Pending된 Tx가 confirm의 언제 될 수 있는지 예측하고 이에 맞는 Callback을 전달해야 한다. 그렇게 해야 사용자는 해당 데이터를 기반으로 결제, 확인등의 용도로 올바르게 사용할 수 있다. 이에 더해 watcher의 비용 또한 효율적으로 관리되어야 서비스 제공자가 원활하게 서비스를 제공할 수 있다.

#Challenge

##실시간 BTC Payment API 시스템

마치 무통장입금의 거래하듯 Websocket등의 실시간 통신을 활용하여 결제를 실시간으로 체크하고 완료 할 수 있도록 Payment 시스템을 구성하여 이를 API를 할 수 있다. 이를 통하여 다양한 서비스에 비트코인으로 결제 받을 수 있는 API를 제공할 수 있다.

#KPI

##Transaction watcher, Address watcher가 발견하는 시간 : 1분 이내

기본적으로 Standard와 Multi-Sig을 만족하는 지갑을 BIP를 참고하여 제작할 수 있으며, 추가적으로 authy등의 2factor app과 연동할 수 있는 지갑종류 또한 사용할 수 있다.

##Watcher server 부하량 : 클라우드 서버의 Free tier 또는 낮은 수준의 가격

수수료 모니터링하여 Sat별로 예상 전송속도를 제안할 수 있으며, 일반적으로 30분 이내에 전송될 수 있는 수치와 가격을 제안하며, 필요에 따라 쉽게 변경할 수 있다.

##지갑 업데이트 : 수동 + 자동
기본적으로 지갑 잠금 해제 시 잔고 및 Transaction을 불러오며, 별도의 tracking이 필요한 경우 블럭생성타임 등의 기준을 설정하여 Transaction의 변화 또는 잔고의 변화를 확인할 수 있다.

##UI : Payment sample에 적용한 MVP도출

최대한 무난한 default값을 적용하여 손쉽게 사용할 수 있도록 제공할 수 있어야함.



