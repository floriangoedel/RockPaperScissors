<?php
    namespace HTL3R\RockPaperScissors\src;

    // choices ... 0 = Rock; 1 = Paper; 2 = Scissors;

    /**
     * @Entity @Table(name="RoundStatistics")
     */
    class RoundStatistics
    {
        /**
         * @Id @Column(type="integer") @GeneratedValue
         */
        protected $id;

        /**
         * @Column(type="integer")
         */
        public $computerChoice;

        /**
         * @Column(type="integer")
         */
        public $playerChoice;


        /**
         * @Column(type="datetime")
         * @var \Datetime
         */
        public $date;


    }