package com.web.gdup.global.component;

import java.util.HashMap;

public class EcoMatching {
    public EcoMatching() {}
    public HashMap<String, String> setEcoMatching() {
        HashMap<String, String> eco = new HashMap<>();
        eco.put("코듀로이", "합성");
        eco.put("면","천연");
        eco.put("데님","합성");
        eco.put("퍼","확인필요");
        eco.put("니트웨어","확인필요");
        eco.put("레이스","합성");
        eco.put("가죽","천연");
        eco.put("가죽 및 스웨이드","확인필요");
        eco.put("리넨","천연");
        eco.put("메쉬/투명","합성");
        eco.put("실크","천연");
        eco.put("소프트쉘","합성");
        eco.put("스웨이드","확인필요");
        eco.put("인조","합성");
        eco.put("직물","확인필요");
        eco.put("트위드","확인필요");
        eco.put("벨벳","합성");
        eco.put("울","천연");
        return eco;
    }
}
